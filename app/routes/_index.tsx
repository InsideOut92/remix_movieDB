import { json } from "@remix-run/node"; 
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Test App" },
    { name: "description", content: "Lets give it another try!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const url = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', 
  {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTAyYzkzZjIxNWE2MzhkYmRkNzIzNDg2YTcyZjMwMiIsIm5iZiI6MTczMDM2MDMwMy45MzkxNDIyLCJzdWIiOiI2NzIzMzJiYTE2MDE0MTlmNzM2MjAzOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sr-sWo4rN1yk0ObfbJd-dhEA3O0EUCsb-yrj7qjE_54'
    }
  });

  return json(await url.json()); 
};

// Type for the data returned from the loader
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

export default function Index() {
  const data = useLoaderData<{ results: Movie[] }>();
  console.log(data);
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Top Trending Movies
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {data.results.map((movie: Movie) => (
            <div key={movie.id} className="flex flex-col overflow-hidden rounded-lg border bg-white">
              <Link 
                prefetch="intent" 
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64" 
                to={`/movies/${movie.id}/comments`}
              > 
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={`Movie poster for ${movie.id}`}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" 
                />
              </Link>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <Link to={`/movies/${movie.id}/comments`} prefetch="intent" className="transition-duration-100 hover:text-indigo-500 active:text-indigo-600">
                    {movie.title}
                  </Link>
                </h2>
                <p className="text-gray-500 line-clamp-3">movie.overview</p>    
              </div>  
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}