useEffect(() => {
  const ws = new WebSocket("ws://127.0.0.1:8000/ws/delays");

  ws.onmessage = (event) => {
    setDelays(JSON.parse(event.data));
  };

  return () => ws.close();
}, []);