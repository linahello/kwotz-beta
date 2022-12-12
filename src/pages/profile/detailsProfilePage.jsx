/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {useEffect} from 'react'
import {observer} from 'mobx-react-lite';
import { useUserStore } from "@contexts/UserContext";
import { useUserProfileStore } from "@contexts/UserProfileContext";
import { Link } from "react-router-dom";

//import react-spinner animation loading
 import {PropagateLoader} from 'react-spinners'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton"

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Footer from "@components/Footer";
import ProfileInfoCard from "@pages/profile/components/ProfileInfoCard";
//import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "@pages/profile/components/DefaultProjectCard";
import PlaceholderCard from "@pages/profile/components/PlaceholderCard";

// Overview page components
import Header from "@pages/profile/components/Header";
import Sidenav from '@components/navbars/Sidenav';
import DashboardNavbar from '@components/navbars/DashboardNavbar';
import { useNavigate } from 'react-router-dom';
import { DetailsSharp } from '@mui/icons-material';

const ProfileOverview = observer(() => {
  const userProfileStore = useUserProfileStore()
  const userStore = useUserStore()
  const userID = userStore.user.id

  useEffect(() => {
    userProfileStore.getProfileDetails(userID)
  }, [])

  const details = userProfileStore.profileDetails

  if(!userProfileStore.profileDetails.id ) {
    return (
      <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
        <PropagateLoader color="#36d7b7"/>
      </Grid>
    )
  }

  

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <Header />
        <SoftBox mt={5} mb={3}>
          <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                title="informations personnelles"
                info={{
                  société: details.company,
                  nomComplet: details.first_name + ' ' + details.last_name,
                  adresse: details.address,
                  ville: details.city,
                  codePostal: details.zipcode,
                  telephone: details.phone_number,
                }}
                action={{ route: "/edit_informations", tooltip: "Edit Profile" }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                title="informations de mon adresse de livraison"
                info={{
                  intitulé: details.shipping_alias,
                  adresse: details.shipping_address,
                  ville: details.shipping_city,
                  codePostal: details.shipping_zipcode,
                }}
                action={{ route: "/edit_shipping", tooltip: "Edit Profile" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
})

export default ProfileOverview;
