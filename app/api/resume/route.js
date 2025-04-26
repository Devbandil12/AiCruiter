import pdf from 'pdf-parse';

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  if (!file) return Response.json({ error: 'No file uploaded' }, { status: 400 });
  
  const some=await file.arrayBuffer()
  const buffer = Buffer.from(some);

  try {
    const result = await pdf(buffer); // Extract text
    return Response.json({ text: result.text });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
