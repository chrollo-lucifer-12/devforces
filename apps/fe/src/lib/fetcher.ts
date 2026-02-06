import axios from "axios";
import { env } from "./env/client";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export async function checkRepoExists(repoURL: string) {
  const [, owner, repo] = new URL(repoURL).pathname.split("/");
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (res.status === 404) {
      throw new Error("Repository not found");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Internal error occured");
  }
}

export async function checkRepoPublic(privateRepo: boolean) {
  if (privateRepo) throw new Error("Repository is not public");
}
