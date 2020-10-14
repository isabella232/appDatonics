import carBack from '@iconify/icons-mdi/car-back';
import youtube from '@iconify/icons-mdi/youtube-tv';
import school from '@iconify/icons-mdi/school';
import router from '@iconify/icons-mdi/router-wireless';
import googleController from '@iconify/icons-mdi/google-controller';
import cashMultiple from '@iconify/icons-mdi/cash-multiple';
import accountChild from '@iconify/icons-mdi/account-child';
import tableTennis from '@iconify/icons-mdi/table-tennis';
import flowerTulip from '@iconify/icons-mdi/flower-tulip';
import homeGroup from '@iconify/icons-mdi/home-group';
import basketball from '@iconify/icons-mdi/basketball';
import tshirtCrew from '@iconify/icons-mdi/tshirt-crew';
import airplaneTakeOff from '@iconify/icons-mdi/airplane-take-off';
import cellphoneIphone from '@iconify/icons-mdi/cellphone-iphone';
import tableCellphone from '@iconify/icons-mdi/tablet-cellphone';
import libraryMusic from '@iconify/icons-mdi/library-music';
import tag from '@iconify/icons-mdi/tag';
import food from '@iconify/icons-mdi/food';
import cards from '@iconify/icons-mdi/cards';
import cast from '@iconify/icons-mdi/cast';
import movieOpen from '@iconify/icons-mdi/movie-open';
import thoughtBubbleOutline from '@iconify/icons-mdi/thought-bubble-outline';
import googleMyBusiness from '@iconify/icons-mdi/google-my-business';
import faceWoman from '@iconify/icons-mdi/face-woman';
import chartBar from '@iconify/icons-mdi/chart-bar';
import professionalHexagon from '@iconify/icons-mdi/professional-hexagon';
import briefCase from '@iconify/icons-mdi/briefcase';
import donkey from '@iconify/icons-mdi/donkey';
import videoInputAntenna from '@iconify/icons-mdi/video-input-antenna';
import instagram from '@iconify/icons-mdi/instagram';
import bookInformationVariant from '@iconify/icons-mdi/book-information-variant';
import shopping from '@iconify/icons-mdi/shopping';
import genderMaleFemaleVariant from '@iconify/icons-mdi/gender-male-female-variant';
import babyFaceOutline from '@iconify/icons-mdi/baby-face-outline';
import acoountCashOutline from '@iconify/icons-mdi/account-cash-outline';
import homeAnalytics from '@iconify/icons-mdi/home-analytics';
import ring from '@iconify/icons-mdi/ring';
import routes from '@iconify/icons-mdi/routes';
import accountChildOutline from '@iconify/icons-mdi/account-child-outline';
import battlenet from '@iconify/icons-mdi/battlenet';
import homeRoof from '@iconify/icons-mdi/home-roof';
import recycle from '@iconify/icons-mdi/recycle';
import shoppingSearch from '@iconify/icons-mdi/shopping-search';
import store from '@iconify/icons-mdi/store';
import googleChrome from '@iconify/icons-mdi/google-chrome';
import charity from '@iconify/icons-mdi/charity';

export function searchIcon(type) {
    let icons =[
        //Interest
        {icon: carBack, type:"Automotive"},
        {icon: youtube, type:"Home Electronics"},
        {icon: school, type:"Education"},
        {icon: router, type:"Electronics"},
        {icon: googleController, type:"Gaming & Video Games"},
        {icon: cashMultiple, type:"Finance & Money"},
        {icon: accountChild, type:"Family"},
        {icon: tableTennis, type:"Hobbies & Interest"},
        {icon: flowerTulip, type:"Home  & Garden"},
        {icon: homeGroup, type:"Real Estate"},
        {icon: basketball, type:"Sports"},
        {icon: tshirtCrew, type:"Style & Fashion"},
        {icon: airplaneTakeOff, type:"Travel"},
        {icon: cellphoneIphone, type:"Mobile Device"},
        {icon: tag, type:"CPG"},
        {icon: food, type:"Food & Beverages"},
        {icon: tableCellphone, type:"Tech Enthusiasts"},
        {icon: cards, type:"Lifestyle"},
        {icon: libraryMusic, type:"Music Enthusiasts"},
        {icon: cast, type:"TV Content"},
        {icon: movieOpen, type:"Movie Enthusiasts"},
        {icon: thoughtBubbleOutline, type:"Social Perception"},
        {icon: thoughtBubbleOutline, type:"Technology Perception"},
        //demographics
        {icon: googleMyBusiness, type:"Small Business"},
        {icon: faceWoman, type:"Women in Business"},
        {icon: chartBar, type:"Business Decision Makers"},
        {icon: professionalHexagon, type:"Industry Professionals"},
        {icon: briefCase, type:"Career Level"},
        {icon: donkey, type:"Political View"},
        {icon: videoInputAntenna, type:"Phone Carriers  & ISPs"},
        {icon: instagram, type:"Mobile Apps"},
        {icon: bookInformationVariant, type:"Tech Specs"},
        {icon: shopping, type:"Shopping Behavior"},
        {icon: cards, type:"Mothers Lifestyle"},
        {icon: genderMaleFemaleVariant, type:"Gender"},
        {icon: babyFaceOutline, type:"Age"},
        {icon: school, type:"Education Level"},
        {icon: acoountCashOutline, type:"Household Income"},
        {icon: homeAnalytics, type:"Property Ownership"},
        {icon: ring, type:"Marital Status"},
        {icon: routes, type:"Occupation"},
        {icon: accountChildOutline, type:"Family Structure"},
        {icon: faceWoman, type:"Mothers Lifestyle"},
        {icon: battlenet, type:"Life Events"},
        {icon: homeRoof, type:"Housing"},
        {icon: recycle, type:"Green Awareness"},
        {icon: instagram, type:"Mobile Apps"},
        {icon: shoppingSearch, type:"Shopping Behavior"},
        {icon: store, type:"Store Visitors"},
        {icon: acoountCashOutline, type:"Personal Finances"},
        {icon: googleChrome, type:"Online Activity"},
        {icon: charity, type:"Donors"},
        {icon: thoughtBubbleOutline, type:"Media Perception"},
        {icon: tag, type:"Past Purchase"},

    ];
    let icon = icons.filter(icon => icon.type == type);

    if (icon.length > 0)
        return icon[0].icon;
    return;
}