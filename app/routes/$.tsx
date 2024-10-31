import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  console.log(`Caught unmatched route: ${url.pathname}`);
  return new Response("Not Found", { status: 404 });
};

export default function CatchAll() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}