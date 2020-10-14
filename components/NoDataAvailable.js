import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Skeleton } from 'antd';

const NoDataAvailable = (props) => {
    return (
        <Skeleton active paragraph={{ rows: 5 }} />
    );
};
NoDataAvailable.propTypes = {
    message: PropTypes.string,
};
export default NoDataAvailable;