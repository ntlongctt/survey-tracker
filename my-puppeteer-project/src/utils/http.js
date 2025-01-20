// Utility function for making fetch requests
export const fetchRequest = async (url, method, data = null) => {
	try {
		const options = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);
		return response.ok ? await response.json() : Promise.reject(response);
	} catch (error) {
		console.error(`Error in ${method} request:`, error);
		throw error;
	}
};

// Utility function for POST requests
export const postRequest = (url, data) => fetchRequest(url, "POST", data);

// Utility function for PUT requests
export const putRequest = (url, data) => fetchRequest(url, "PUT", data);
