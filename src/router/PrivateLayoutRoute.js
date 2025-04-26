import React from 'react';
import { Navigate, Outlet } from 'react-router';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

const PrivateLayoutRouter = ({ isAuthed, ...miscProps }) => {
  if (!isAuthed) {
    return (
      <Navigate
        to={{
          pathname: '/login'
        }}
      />
    );
  }

  return (
    <Layout>
      <Outlet {...miscProps} />
    </Layout>
  );
};

PrivateLayoutRouter.propTypes = {
  children: PropTypes.object,
  isAuthed: PropTypes.bool
};

export default PrivateLayoutRouter;
