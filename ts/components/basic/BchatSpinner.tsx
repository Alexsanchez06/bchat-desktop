import React from 'react';

type Props = {
  loading: boolean;
};

export const BchatSpinner = (props: Props) => {
  const { loading } = props;

  return loading ? (
    <div className="session-loader" data-testid="loading-spinner">
      <div />
      <div />
      <div />
      <div />
    </div>
  ) : null;
};
