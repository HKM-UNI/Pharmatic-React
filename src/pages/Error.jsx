function Error({ message }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
      <h1 className="text-4xl font-bold text-destructive xl:text-8xl">
        Se ha producido un error! <br />
        <br />
        {message && (
          <h2 className="text-xl font-semibold xl:text-4xl">info: {message}</h2>
        )}
      </h1>
    </div>
  );
}

export default Error;
