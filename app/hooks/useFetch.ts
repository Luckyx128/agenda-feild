import { ParamValue } from 'next/dist/server/request/params';
import { useEffect, useState } from 'react';

interface Param {
	[key: string]: ParamValue
}

type FetchProps = {
	method: 'GET' | 'POST' | 'PUT'
	param: Param | null
	url: string
}


export function useFetch<T>({ method, param, url }: FetchProps) {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const api_url = process.env.NEXT_PUBLIC_API_URL
		const parans = Object.entries(param || {})
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
			.join("&");
		fetch(api_url + url + '?' + parans, {
			method: method
		}).then(res => {
			if (!res.ok) throw new Error('Erro ao buscar dados');
			return res.json()
		}).then((json: T) => setData(json))
			.catch(err => setError(err))
			.finally(() => setLoading(false));
	},[method,param,url])

	return { data, loading, error }

}
