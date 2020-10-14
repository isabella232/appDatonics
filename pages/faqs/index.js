import React from "react";
import AdminLayout from '../../components/layouts/admin';
import Link from "next/link";

class Index extends React.Component {

  render() {
    return (
            <AdminLayout>
                <div className="text-center" style={{marginTop:'3rem'}}>
                    <h3>Frequently Asked Questions</h3>
                    <Link href="../support"><button className="btn btn-sm mt-2 btn-support"><i className="far fa-envelope"></i> Send us your question</button></Link>
                </div>
                <div className="container">
                    <div className="pt-5 row justify-content-start">
                        <div className="col-sm-5 offset-md-1">
                            <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">HOW LONG WILL IT TAKE TO GENERATE MY ANALYTICS?</h4>
                            <p className="faq-answer mb-4">Like many analytics platforms, Audience Insights takes time to populate. On download, a pixel will be placed within your HTML code. This pixel tracks your monthly visitors and matches them against Datonics’ 500M+ monthly cookied users to uncover the interests, demographics, and shopping behaviors of your site’s unique audience. Please allow approximately 24 hours for your site's users to be processed and for your first report to be generated.</p>
                        </div>
                        <div className="col-sm-5">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">HOW MANY MONTHLY VISITORS SHOULD I HAVE?</h4>
                            <p className="faq-answer mb-4">Stores with the most success have upward of 20,000 monthly unique visitors.</p>
                        </div>
                        <div className="col-sm-5 offset-md-1">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">WHERE CAN I ENGAGE WITH MY HIGH PERFORMING SEGMENTS?</h4>
                            <p className="faq-answer mb-4">Datonics data is leveraged in most DSPs and DMPs for targeting, analytics, and modeling. You can take advantage of premium audiences at efficient pricing on Adobe Audience Manager, Amobee, Krux, Neustar, The Trade Desk, AppNexus, Centro, Undertone, Google Display & Video 360, MediaMath, Salesforce, and more. View all of our partners <Link href="https://www.datonics.com">here.</Link> </p>
                        </div>
                        <div className="col-sm-5">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">HOW DOES DATONICS COLLECT DATA?</h4>
                            <p className="faq-answer mb-4">Datonics aggregates search, intent, life stage, behavioral, B2B and demographic data on 500M cookied users and 250M mobile users in North America on a monthly basis. The data comes from keyword interactions taking place on shopping sites, product review sites, comparison engines, directories and other online properties as well as compiled data from offline sources.</p>
                        </div>
                        <div className="col-sm-5 offset-md-1">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">HOW CAN I USE DATONICS AUDIENCE INSIGHTS?</h4>
                            <p className="faq-answer mb-4">Learn what your audience buys, what motivates them, what makes them tick, what inspires them and gain comprehensive insight into the makeup of your audience across age, gender, family, income, education, occupation, political interest, and more. Tailor your products, the design of your site, your copy, your marketing efforts and your ad campaigns to be more relevant and inviting and keep your shoppers coming back. Track how your audience changes over time and affirm that you’re reaching the right people. Are media buys targeting the right audience? Is your message getting through? Are people engaging with your call to action? Audience Insights allows you to drive better strategy and reduce wasted impressions.</p>
                        </div>
                        <div className="col-sm-5">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">WHAT HAPPENS IF I CHANGE THEMES?</h4>
                            <p className="faq-answer mb-4">No need to worry about reinstalling the code if you change store themes. Audience Insights will auto-insert the necessary script into your new theme.</p>
                        </div>
                        <div className="col-sm-5 offset-md-1">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">WILL DATONICS AFFECT THE FUNCTIONALITY/LATENCY OF MY WEBSITE?</h4>
                            <p className="faq-answer mb-4">Audience Insights will have no effect on your current web page functionality or latency. We work with thousands of satisfied sites, use a code that loads after your site content loads, and use a monitoring service to track performance.</p>
                        </div>
                        <div className="col-sm-5">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">HOW CAN I MONETIZE MY SHOP’S DATA?</h4>
                            <p className="faq-answer mb-4">Datonics pays you for sharing anonymous behavioral information about your users. There is no cost to participate and no impact on your current revenue generation efforts. Test our data monetization service, there is no fee to use our services and partners can opt out at any time. Learn more about monetizing your data <Link href="https://www.datonics.com/monetize-your-data">here.</Link></p>
                        </div>
                        <div className="col-sm-5 offset-md-1">
                        <div className="faq-question-q-box">Q.</div>
                            <h4 className="faq-question">WHAT ABOUT PRIVACY?</h4>
                            <p className="faq-answer mb-4">Datonics is a recognized leader in and takes a proactive approach to online privacy. We are an NAI member (former NAI board member), are CCPA compliant, and only collect anonymous user information. We never collect sensitive or personally-identifiable information. More information on our commitment to privacy may be found in our <Link href="http://datonics.com/privacy">Consumer Privacy Center.</Link></p>
                        </div>
                    </div>
                </div>
            </AdminLayout>  
    );
  }
}

export default Index;