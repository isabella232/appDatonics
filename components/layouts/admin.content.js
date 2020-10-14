import PropTypes from 'prop-types';

const AdminContent = (props) => {
    return <div className="content-wrapper fontStyle" style={{minHeight: '310px', padding: '0px 12px 65px'}}>
        <div className="content-header">
            {props.title && <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-10">
                        <div className="page-title-box">
                            <h4 className="page-title">{props.title}</h4>
                        </div>
                        
                    </div>
                    <div className="col-sm-2 text-right text-muted">
                        {props.titleButton && props.titleButton}
                    </div>
                </div>
            </div>}
        </div>
        <div className="content">
            <div className="container-fluid">
                {props.children}
            </div>
        </div>
    </div>
};

AdminContent.propTypes = {
    title: PropTypes.string,
    titleButton: PropTypes.element,
};

export default AdminContent;