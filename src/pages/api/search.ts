import type { NextApiRequest, NextApiResponse } from 'next'
import * as https from "https";
import {Hero} from "@/common/hero.types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Hero[]>
) {
    const { name } = req.query;

    const promise: Promise<Hero[]> = new Promise((resolve, reject) => {
        const  options = {
            host: 'superheroapi.com',
            port: 443,
            path: `/api.php/${process.env.API_KEY}/search/${name}`,
            method: 'GET'
        };
        const request = https.request(options, (resp) => {
            let body = '';

            resp.on('data', chunk => {
                body = body + chunk;
            })
            resp.on('end', () => {
                const data = JSON.parse(body.toString());
                if (data.response === 'success') {
                    return resolve(data.results);
                }
                resolve([]); // not found
            })
        });
        request.on('error', error => {
            reject(`Error on Get Request --> ${error}`);
        })
        request.end();
    });
    res.status(200).json(await promise);
}