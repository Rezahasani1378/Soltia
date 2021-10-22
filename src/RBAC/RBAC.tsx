import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/User';

const RBAC = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: any;
}) => {
  const { accessibility } = useSelector(selectUser);

  let hasAccess = allowedRoles.includes(accessibility);
  return hasAccess ? children : <></>;
};

export default RBAC;
