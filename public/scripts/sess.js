let page = window.location.pathname;
//console.log("Page: "+page);


if(sessionStorage.current_page && sessionStorage.current_page != page ){
	sessionStorage.last_page = sessionStorage.current_page;
}

sessionStorage.current_page = window.location.pathname;
console.log("Current page: "+sessionStorage.current_page);

console.log(sessionStorage.last_page=="/login" || sessionStorage.last_page=="/users/new" )
if(sessionStorage.last_page==="/login" || sessionStorage.last_page==="/users/new" || sessionStorage.last_page==="/users"){
	sessionStorage.removeItem("last_page");
}

console.log("Last page: "+sessionStorage.last_page);