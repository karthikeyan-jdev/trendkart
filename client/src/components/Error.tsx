function Error({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-red-600">
        {error.message || "An error occurred"}
      </h1>
    </div>
  );
}

export default Error;
