// const searchBar =  document.querySelector("[search-container]");
const profile = document.querySelector("[profile-container]");

const url = "https://api.github.com/users/";
const input = document.querySelector("[data-input]")
const noResult = document.querySelector("[error-container]");
const profilePic = document.querySelector("[profile-avatar]");

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const clickSearch = document.querySelector("[button-search]");


  clickSearch.addEventListener("click", function(){
    if(input.value!=""){

        // this line will get the profile of the username
        // ex "https://api.github.com/users/input.value"
        getUserdata(url + input.value); 

    }
  });

  input.addEventListener("keydown", function(e) {
    if(e.key == "Enter"){
        if(input.value!=""){

            getUserdata(url + input.value); 

        }
    }
  });
 
//   calling api 

async function getUserdata(gitUrl){
    
    try{
        const response = await fetch(gitUrl);
        const data = await response.json();
        updateProfileData(data);
    }
    catch (e){
        //handling the error
    }
}

  // getting the containers needed to get the texts displayed 
  const profileContainer = document.querySelector("[info-container]");
  const avatar = document.querySelector("[profile-avatar]");
  const UserName = document.querySelector("[profile-name]");
  const UserLink = document.querySelector("[user-profile-link]");
  const date = document.querySelector("[profile-joined]");
  const bio = document.querySelector("[about-profile]");
  const repos = document.querySelector("[repos]");
  const followers = document.querySelector("[data-followers]");
  const following = document.querySelector("[data-following]");
  const locationElement = document.querySelector("[location]");
  const userPage = document.querySelector("[user-page]");
  const twitter = document.querySelector("[data-twitter]");
  const company = document.querySelector("[data-company]");



function updateProfileData(data){
    if(data.message === "Not Found"){
        noResult.classList.add("active");
    }

    function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
    }
    noResult.classList.remove("active");

    avatar.src = `${data.avatar_url}`;
    UserName.innerText = data.name === null? data.login : data.name; 
    UserLink.innerText = `@${data.login}`;

    let dateSegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${dateSegments[2]} ${
        months[dateSegments[1]-1]
    } ${dateSegments[0]}`;

    bio.innerText = data.bio === null? "This profile has no bio" : `${data.bio}`;

    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    locationElement.innerText = checkNull(data.location, locationElement) ? data.location : "Not Available";
    userPage.innerText = checkNull(data.blog,userPage)?data.blog:"Not Available";
    twitter.innerText = checkNull(data.twitter_username,twitter)?data.twitter_username:"Not Available";
    company.innerText = checkNull(data.company, company)? data.company: "Not Available";
    searchBar.classList.toggle("active");
    profileContainer.classList.toggle("active");
}