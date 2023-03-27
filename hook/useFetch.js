import { useEffect, useState } from "react";

import axios from "axios";


const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const options = {
		method: "GET",
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			"X-RapidAPI-Key": 'd97d6929dfmsh66033cebc993c58p1b2dc5jsnf64dd010b527',
			"X-RapidAPI-Host": "jsearch.p.rapidapi.com",
		},
		params: { ...query },
	};

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.request(options);
			setData(response.data.data);
			setIsLoading(false);
		} catch (e) {
			setError(e);
			alert("There is an Error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	function refetch() {
		setIsLoading(true);
		fetchData();
	}

    return {data , isLoading , error ,refetch};
};


export default useFetch;