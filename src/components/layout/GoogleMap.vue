<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>
<script>
  import firebase from 'firebase';
  import db from '@/firebase/fb';

  export default {
    name: 'GMap',
    data() {
      return {
        lat: 31,
        lng: -99
      }
    },
    methods: {
      renderMap(){
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: this.lat,
            lng: this.lng
          },
          zoom: 6,
          maxZoom: 8,
          minZoom: 3,
          streetViewControl: false
        })

        // add marker to map for users
        db.collection('users').get().then(users => {
          users.docs.forEach(doc => {
            let data = doc.data()
            if(data.geolocation){
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map: map
              })
              // add click event to marker
              marker.addListener('click', () => {
                console.log(doc.id)
              })
            }
          })
        })
      }
    },
    mounted(){
      // get current user
      let user = firebase.auth().currentUser

      // get user geolocation
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          
          // find the user record and update geo coords
          db.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot => {
              snapshot.forEach((doc) => {
                db.collection('users').doc(doc.id).update({
                  geolocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  }
                })
              })
            }).then(() => {
              this.renderMap();
            })
        }, (err) => {
          console.log(err);
          this.renderMap();
        }, {
          maximumAge: 60000,
          timeout: 3000
        })
      } else {
        // position center by default value
        this.renderMap()
      }
    }
  }
</script>

<style>
  .google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }

</style>
