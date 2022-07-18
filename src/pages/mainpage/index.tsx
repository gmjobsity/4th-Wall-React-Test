import React, { FC, PropsWithChildren, useEffect, useMemo, useRef, useState  } from 'react';
import { useDispatch } from 'react-redux';

import { Menu } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ModalComponent from 'shared/components/modal';
import ContactFormComponent from 'shared/components/contact/contactform';
import { actions as contactsActions, ContactStoredDef } from 'store/reducers/contacts/';
import { actions as locationsActions, LocationStoredDef } from 'store/reducers/locations/';
import { Contact } from 'models/contact';
import { useGetFromStore } from 'store/utils';
import ContactCardComponent from 'shared/components/contact/card';
import DialogComponent from 'shared/components/dialog';
import { StorageItemStatus } from 'models/storage-item-states';
import LoaderComponent from 'shared/components/loader';

const MainPageComponent:FC<PropsWithChildren> = () => {
  const dispatch = useDispatch();
  const [openNewContact, setOpenNewContact] = useState(false);
  const [openDeleteContact, setOpenDeleteContact] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const contactToDeleteRef = useRef<Contact | null>(null);
  const contactsResource: ContactStoredDef = useGetFromStore('contacts');
  const locationsResource: LocationStoredDef = useGetFromStore('locations');

  useEffect(()=>{
    dispatch(contactsActions.load());
    dispatch(locationsActions.load());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveContact = (contact: Contact) => {
    if(contact.id){
      dispatch(contactsActions.update(contact));
    } else {
      dispatch(contactsActions.create(contact));
    }
  }

  const deleteContact = () =>{
    if(contactToDeleteRef.current){
      dispatch(contactsActions.delete(contactToDeleteRef.current));
      contactToDeleteRef.current = null;
    }
  }

  const contacts = useMemo(()=>{
    return (contactsResource.data as Contact[]) || []
  }, [contactsResource.data]);

  const isProcessing = useMemo(()=>{
    return contactsResource.load.status === StorageItemStatus.PENDING
      || contactsResource.create.status === StorageItemStatus.PENDING
      || contactsResource.delete.status === StorageItemStatus.PENDING
      || contactsResource.update.status === StorageItemStatus.PENDING
      || locationsResource.load.status === StorageItemStatus.PENDING
  },[contactsResource, locationsResource]);

  return (
    <>
      <AppBar position='static' className='root'>
        <Toolbar>
          <IconButton edge='start' className='menuButton' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6' className='title'>Contacts</Typography>
          <Button color='inherit' onClick={()=>{
              setContactToEdit(null);
              setOpenNewContact(true)
            }}
          >
            New Contact
          </Button>
        </Toolbar>
      </AppBar>
      {isProcessing ?  <LoaderComponent />
      : <Grid container spacing={2} className='contactsGrid'>
        {contacts?.map((contact:Contact) => (
          <Grid key={contact.id} item xs={12} md={6} xl={3}>
            <Paper className='paper'>
              <ContactCardComponent
                contact={contact}
                onEdit={()=>{
                  setContactToEdit(contact);
                  setOpenNewContact(true)
                }}
                onDelete={()=>{
                  contactToDeleteRef.current = contact;
                  setOpenDeleteContact(true);
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      }

      <ModalComponent
        title={!contactToEdit ? "New contact" : "Edit contact"}
        open={openNewContact}
      >
        <ContactFormComponent
          contact={contactToEdit}
          onSubmit={(data)=>{
            saveContact(data);
            setOpenNewContact(false)
          }}
          onCancel={()=>{
            setOpenNewContact(false)
          }}
        />
      </ModalComponent>

      <DialogComponent
        title="Delete Contact"
        content="Do you want to delete this contact?"
        open={openDeleteContact}
        onOk={()=>{
          deleteContact();
          setOpenDeleteContact(false);
        }}
        onClose={()=>{
          setOpenDeleteContact(false);
        }}
      />
    </>
  );
}

export default MainPageComponent;
