import {useSuperHeroesData} from "../hooks/useSuperHeroesData"


function RQSuperHeroesPage() {
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData();

  console.log( {isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })} */}
      {data?.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })}
    </>
  );
}

export default RQSuperHeroesPage;
