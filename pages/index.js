import React, { useState } from "react";

export async function getServerSideProps() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const cat = await res.json();
  return { props: { cat } };
}

export default function MyApp({ cat }) {
  const [count, setCount] = useState(0);

  // return (
  //   <div>
  //     <h1>Counters {count} times</h1>
  //     <button onClick={() => setCount(count + 1)}>Click me</button>
  //   </div>
  // );

  return <img src={cat[0].url} width="200" />;
}
