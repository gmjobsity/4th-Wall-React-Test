import React, { FC, PropsWithChildren, useMemo } from 'react';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';
import { Contact } from 'models/contact';
import { Location } from "models/location";
import { useGetFromStore } from 'store/utils';
import { Button, Grid } from '@mui/material';

interface IContactCardComponent {
  contact: Contact;
  onEdit?(): void;
  onDelete?(): void;
}

const ContactCardComponent:FC<PropsWithChildren<IContactCardComponent>> = ({ contact, onEdit, onDelete }) =>{
  const locationsResource = useGetFromStore('locations');

  const location = useMemo(()=>{
    return locationsResource.data?.find( (location: Location) => location.id === contact.locationId )
  }, [locationsResource.data, contact])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} alignItems="center">
          <Typography variant="h2" sx={{fontSize: 16}}>
            {contact.firstName} {contact.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <PlaceIcon fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{fontSize: 12}}>
                {location?.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} alignItems="center">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <PhoneIcon fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{fontSize: 12}}>
                {contact.phone}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="primary"
        onClick={()=>{onEdit?.();}}
      >
        Edit
      </Button>
      <Button
        type="button"
        onClick={()=>{onDelete?.();}}
      >
        Delete
      </Button>
    </Box>
  );
}

export default ContactCardComponent;
