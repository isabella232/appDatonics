import Link from 'next/link';
import { useRouter} from 'next/router';
import { useState } from 'react';
import Icon from '@iconify/react';
import MeterAlt from '@iconify/icons-carbon/meter-alt';
import Pulse from '@iconify/icons-bx/bx-pulse';
import Question from '@iconify/icons-eva/question-mark-circle-outline';
import ProgressWrench from '@iconify/icons-mdi/progress-wrench'


const AdminHeader = ({props}) =>{
  const [hover, setHover] = useState(false); 
  const router = useRouter();

    return(
<nav className="main-header navbar navbar-expand-md navbar-light navbar-white" onMouseOut={() => setHover(false)} >
  <div>
    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item dropdown" onMouseOver={() => setHover(true)}>
        <a id="dropdownSubMenu1" onMouseOver={() => setHover(true)} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle" style={{display: 'inline-flex', paddingTop: '10px', paddingBottom: '10px'}}>
          <Icon  icon={MeterAlt} style={{fontSize: "14pt"}}/>
          <p>Dashboards</p>
        </a>
          <ul aria-labelledby="dropdownSubMenu1" onMouseOut={() => setHover(false)} className={hover ? "dropdown-menu border-0 shadow show": "dropdown-menu border-0 shadow"} style={{width: '200px'}}>
            <li>
              <Link href="/dashboard/mostpopular"><a className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/mostpopular" ? " active" : "")}>
                <p>Most Popular</p>
              </a></Link>
            </li>
            <li>
              <Link href="/dashboard/demographics"><a className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/demographics" ? " active" : "")}>
                <p>Demographics</p>
              </a></Link>
            </li>
            <li>
              <Link href="/dashboard/shoppingpreferences"><a  className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/shoppingpreferences" ? " active" : "")}>
                <p>Shopping Preferences</p>
              </a></Link>
            </li>
            <li>
              <Link href="/dashboard/aditionalinterestdashboard"><a  className={"nav-link side-nav-second-level" + (router.pathname == "/dashboard/aditionalinterestdashboard" ? " active" : "")}>
                <p>Interests</p>
              </a></Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link href="/reports"><a  className={"nav-link side-nav-link" + (router.pathname == "/reports" ? " active" : "")}>
            <Icon  icon={Pulse} style={{fontSize: "14pt"}}/>
            <p>Reports</p>
          </a></Link>
          </li>
        <li className="nav-item">
          <Link href="/support"><a  className={"nav-link side-nav-link" + (router.pathname == "/support" ? " active" : "")}>
          <Icon  icon={ProgressWrench} style={{fontSize: "14pt"}}/>
            <p>Support</p>
          </a></Link>
        </li>
        <li className="nav-item">
        <Link href="/faqs"><a  className={"nav-link side-nav-link" + (router.pathname == "/faqs" ? " active" : "")}>
        <Icon  icon={Question} style={{fontSize: "14pt"}}/>
          <p>FAQs</p>
        </a></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}

export default AdminHeader;