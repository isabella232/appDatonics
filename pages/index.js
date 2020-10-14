import React, { useState, useEffect } from "react";
import { useRouter} from 'next/router'
import AdminLayout from '../components/layouts/admin';
import gql from 'graphql-tag';
import { useQuery, useMutation} from 'react-apollo';
import axios from 'axios';
import store from 'store-js';
import 'antd/dist/antd.css';
import { Skeleton } from 'antd';
import Slider from "react-slick";
import { Card, Row, Col, CardBody } from "reactstrap";
import AdminInit from "../components/layouts/adminInit";


const GET_SHOP = gql`
{
  shop{
    name
    myshopifyDomain
  }
}
`;
let dataShop;
const getApiShop = () => {
  const {loading, error, data} = useQuery(GET_SHOP);
    if(loading){null}
    if(error){null}
    if(data){dataShop = data};
}

const Index = () =>{
  const router = useRouter();
  const [idDatonics, setidDatonics] = useState(0);
  let slider;

  const getShop = (name) =>{
    axios.get(`https://mighty-badlands-15868.herokuapp.com/api/shop/${name}`)
    .then(response => {
      if(response.data.length <= 0){
        if(idDatonics == 0)
          generateUrlScript();
      }else{
        store.set('id_shop',response.data[0].id_shop);
        store.set('shop_name', dataShop.shop.name)
        router.push('/dashboard/demographics');
      }
        
    });
  }

  const storeShop = (id_tag)=>{
       axios.post("https://mighty-badlands-15868.herokuapp.com/api/shop/shop",{
         data:{
          id_shop: idDatonics,
          shop_name: dataShop.shop.name,
          shop_url: dataShop.shop.name,
          shop_tag: id_tag
         }
    })
    .then(response => { 
        if(response.config.data){
          let shop;
          shop = response.config.data;
          store.set('id_shop', idDatonics);
          store.set('shop_name', dataShop.shop.name);
          router.push('/dashboard/demographics');
        }
    });
  }

  function generateUrlScript(){
    $.ajax({
      url:'https://account.datonics.com/index.php/dpui/create_account',
      type:'post',
      data:{name:dataShop.shop.name, domain:dataShop.shop.myshopifyDomain},
      success:function(data){
          let id = JSON.parse(data);
          if(id)
            setidDatonics(id.api_id);
      }
  })
  }

  const ADD_TAG = gql `
  mutation {
      scriptTagCreate(input: {src:"https://ads.pro-market.net/ads/scripts/site-${idDatonics}.js", displayScope:ALL}) {
        scriptTag {
          id
          src
          displayScope
        }
        userErrors {
          field
          message
        }
      }
    }
  `;  
  getApiShop();


  if (dataShop) {
    if (store.get('id_shop') && store.get('shop_name') == dataShop.shop.name) {
      router.push('/dashboard/demographics');
    }else
      getShop(dataShop.shop.name);
  }

  const[scriptTagCreate, {data}] = useMutation(ADD_TAG);
  if (data) {
    storeShop(data.scriptTagCreate.scriptTag.id);
  }

  const next = () =>{
    slider.slickNext();
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  //store.set('id_shop',0);
  return(
    <AdminInit>
      <Row>
        <Col sm={12} lg={{ size: 10, offset: 1 }}>
          <Card style={{overflowX:'hidden', overflowY:'hidden'}}>
            <CardBody>
            {
              dataShop && idDatonics?(
                <Slider ref={c => (slider = c)} {...settings}>
                <div>
                  <img src={"img/1.png"} onClick={next} width="100%"/>
                </div>
                <div>
                  <img src={"img/2.png"} onClick={next} width="100%"/>
                </div>
                <div>
                  <img src={"img/3.png"} onClick={next} width="100%"/>
                </div>
                <div>
                  <img src={"img/4.png"} width="100%" onClick={scriptTagCreate}/>
                </div>
              </Slider>
              ):(
                <Skeleton active paragraph={{ rows: 5 }} />
              )
            }  
            </CardBody> 
          </Card>
        </Col>
      </Row>
    </AdminInit>
  );
}

export default Index;