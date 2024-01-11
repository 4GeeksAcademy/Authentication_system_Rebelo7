const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			signupNewUser: async (formSignup)=>{
				const url="https://stunning-space-fishstick-wrg456gjpwwc5g57-3001.app.github.dev/"
				const signupRequirement="/api/signup"
				try{
					// console.log(url+signupRequirement)
					const response= await fetch(url+signupRequirement,{
						method:"POST",
						body: JSON.stringify(formSignup),
						headers:{
							'Content-type': 'application/json'
						},					
					})
	
					if (response.ok){
						const jsonResponse= await response.json()
						console.log(jsonResponse)
						const store = getStore()
						setStore({...store,messageToShowAlert:jsonResponse})
					}
				
					else{
						const jsonResponse=await response.json()
						console.log(jsonResponse)
	
					}
	
				}
	
				catch(e){
					
					console.log("An error has occured",e)
					
				}
			},
			
			loginUserExisting:async({ email, password })=>{
				const url="https://stunning-space-fishstick-wrg456gjpwwc5g57-3001.app.github.dev/"
				const loginRequirement="/api/login"
				try{
					const response = await fetch(url+loginRequirement, 
						{
							method:'POST',
							body:JSON.stringify({
								email,
								password
							}),
							headers:{
								'Content-type': 'application/json'
							}
						}
						)

						const jsonResponse= await response.json()
	
						if (jsonResponse["token"]){
							localStorage.setItem("usertoken", jsonResponse["token"])
							return true;
	
						}
						return false;
						
				}
			
				catch(e){
							console.log("An error was occurred, check it out!",e)
				}
	
	
			},
	
			getInformationOfToken: async()=>{
				const url="https://stunning-space-fishstick-wrg456gjpwwc5g57-3001.app.github.dev/"
				const tokenRequirement="/api/private"
				const storageToken=sessionStorage.getItem("userToken")
				try{
					const response= await fetch(url+tokenRequirement,{
						method:"GET",
						headers:{
							"Authorization":`Bearer ${storageToken}`,
							'Content-type': 'application/json'
						}
					})
	
					if (response.ok){
						const jsonResponse= await response.json()
						console.log(jsonResponse)
						const store=getStore()
						setStore({...store,informationUserLogin:jsonResponse})
					}
					else{
						const jsonResponse=response.json()
						console.log(jsonResponse)
						const store=getStore()
						store({...store,informationUserLogin:jsonResponse})
					}
	
				}
				catch(e){
					console.error("Error fetching data",e)
				}
			}
		}
	};
};

export default getState;
