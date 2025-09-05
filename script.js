const { createApp } = Vue;

createApp({
  data(){ return { user: "" } },
  methods:{
    loginUser(){
      if(!this.user.trim()) return;
      localStorage.setItem("user", this.user.trim());
      window.location.href = "user.html";
    }
  }
}).mount("#app");
