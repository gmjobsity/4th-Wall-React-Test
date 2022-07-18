import React, { FC, PropsWithChildren, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';

import { useGetFromStore } from 'store/utils';

import { Contact } from 'models/contact';
import { Location } from "models/location";

interface IContactForm {
  contact?: Contact | null;
  onSubmit?(data: Contact): void;
  onCancel?(): void;
}

const ContactFormComponent:FC<PropsWithChildren<IContactForm>> = ({ contact, onSubmit, onCancel }) => {

  const { register, handleSubmit, formState } = useForm({
    defaultValues: contact || {},
  });

  const {isDirty, errors} = formState;

  const locationsResource = useGetFromStore('locations');

  const [locationsOptions, setLocationsOptions] = useState([]);

  useEffect(()=>{
    if(locationsResource?.data){
      setLocationsOptions(locationsResource.data);
    }
  }, [locationsResource?.data]);

  const getLocationsOptionsMenuItems = () => locationsOptions.map((location: Location)=><MenuItem value={location.id}>{location.name}</MenuItem>)

  return (
    <form onSubmit={handleSubmit((data) => onSubmit?.({...contact, ...data}))} >
      <Grid container spacing={2}>
        <Grid item xs={12} alignItems="center">
          <TextField
            {...register('firstName', {
              required: true
            })}
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            defaultValue={contact?.firstName}
            error={errors.firstName && !!errors.firstName}
          />
        </Grid>
        <Grid item xs={12} alignItems="center">
          <TextField
            {...register('lastName', {
              required: true
            })}
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            defaultValue={contact?.lastName}
            error={errors.lastName && !!errors.lastName}
          />
        </Grid>
        <Grid item xs={12} alignItems="center">
          <Select
            {...register('locationId', {
              required: true
            })}
            fullWidth
            labelId="location-label"
            id="locationId"
            name="locationId"
            label="Location"
            value={contact?.locationId}
          >
            {getLocationsOptionsMenuItems()}
          </Select>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <TextField
            {...register('phone', {
              required: true
            })}
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            defaultValue={contact?.phone}
            error={errors.phone && !!errors.phone}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="primary"
        disabled={!isDirty}
      >
        Submit
      </Button>
      <Button
        type="button"
        onClick={()=>{onCancel?.();}}
      >
        Cancel
      </Button>
    </form>
  );
}

export default ContactFormComponent;
