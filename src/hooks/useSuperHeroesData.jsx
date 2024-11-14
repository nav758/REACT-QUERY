import axios from "axios";
import {  useQuery } from "react-query";



const fectchSuperHeroes = async () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  export const useSuperHeroesData = () =>{
    return(
  useQuery(
    "Super-heroes",
    fectchSuperHeroes,
    {
     onSuccess: (data) => {
       console.log("fetched data", data);
     }, 
     onError: (error) => {
       console.log("error", error);
     },

     select: (data) => {
       const superHeroNames = data.data.map((hero) => hero.name);
       return superHeroNames;
     },

    }
  ))
}
