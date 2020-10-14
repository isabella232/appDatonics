import { Component} from 'react';
import Link from 'next/link';
import { useRouter} from 'next/router';

const AdminSidebar = () =>{
  const router = useRouter();
    return(
     <aside className="main-sidebar sidebar-dark-primary elevation-4">
  <div className="sidebar">
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
         <li>
            <h6 className="side-nav-title">NAVIGATION</h6>
         </li>
        <li className="nav-item has-treeview menu-open">
          <a className="nav-link side-nav-link active">
            <i className="iconify uil-home-alt" data-icon="uil:home-alt" data-inline="false"/>
            <p>
                Dashboards
              <i className="right fas fa-angle-right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
          <li className="nav-item">
                <Link href="/dashboard/mostpopular">
                    <a
                    className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/mostpopular" ? " active" : "")}>
                        <p>Most Popular</p>
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/dashboard/demographics">
                    <a
                    className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/demographics" ? " active" : "")}>
                        <p>Demographics</p>
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/dashboard/shoppingpreferences">
                <a  className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/shoppingpreferences" ? " active" : "")}>
                    <p>Shopping Preferences</p>
                </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/dashboard/aditionalinterestdashboard">
                <a  className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/aditionalinterestdashboard" ? " active" : "")}>
                    <p>Additional Interest</p>
                </a>
                </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
            <Link href="/reports">
                <a  className={"nav-link side-nav-link" + (router.pathname == "/reports" ? " active" : "")}>
                    <span className="iconify" data-icon="mdi:chart-donut" data-inline="false" />
                    <p>
                    Reports
                    </p>
                </a>
            </Link>
        </li>
        <li className="nav-item">
        <Link href="/support">
          <a  className={"nav-link side-nav-link" + (router.pathname == "/support" ? " active" : "")}>
            <span className="iconify" data-icon="mdi:wrench" data-inline="false" />
            <p>
              Support
            </p>
          </a>
        </Link>
        </li>
        <li className="nav-item">
        <Link href="/faqs">
          <a  className={"nav-link side-nav-link" + (router.pathname == "/faqs" ? " active" : "")}>
          <span className="iconify" data-icon="eva:question-mark-circle-outline" data-inline="false" />
            <p>
              FAQs
            </p>
          </a>
        </Link>
        </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>
        );
} 
export default AdminSidebar;