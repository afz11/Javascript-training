//Higher order function takes another function as parameter
//Callback function is the parameter and gets called later

//MAP
const videos = ['Pranking', 'Toturials', 'Teaching', 'java', 'css', 'Js'];

// const newVideos = videos.map( (video) => {
//     return video.toUpperCase();
// })

const arrowVideo = videos.map(video => video.toUpperCase());

//FIND
//Give only the first result

const search = videos.find(video => {
    return video.includes('Tot')
})

// console.log(search)

//FILTER
//Returns multiple results

const shortSearch = videos.filter(video => {
    return video.length<6;
})

// console.log(shortSearch)

//SOME and EVERY
//Good for checking/testing/verifying something
//Returns true or false

const checkLength = videos.every(video => {
    return video.length >= 2;
})

console.log(checkLength);


 