exports.handler = async function (event) {
  const { roomImageBase64, carpetImageBase64 } = JSON.parse(event.body);

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=' + process.env.GEMINI_API_KEY,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { text: "Place this carpet pattern realistically on the floor of this room photo, matching perspective, lighting and shadows." },
          { inline_data: { mime_type: "image/png", data: roomImageBase64 } },
          { inline_data: { mime_type: "image/png", data: carpetImageBase64 } }
        ]}]
      })
    }
  );

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
