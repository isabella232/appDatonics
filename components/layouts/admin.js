import AdminSidebar from "./admin.sidebar";
import AdminHeader from "./admin.header";
import AdminContent from "./admin.content";
import PropTypes from 'prop-types';

/**
 * Main admin layout - A Higher Order Component
 */
class AdminLayout extends React.Component {
    render() {
        return <div className="wrapper">
            <AdminHeader/>
            <AdminContent title={this.props.contentTitle} titleButton={this.props.contentTitleButton}>
                {this.props.children}
            </AdminContent>
            {/*<AdminFooter rightContent={'Some text for the footer'} leftContent={<div>I must be an element</div>}/>*/}
        </div>
    }
}

AdminLayout.propTypes = {
    contentTitle: PropTypes.string,
    contentTitleButton: PropTypes.element,
};
export default AdminLayout