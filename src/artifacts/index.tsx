import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModelLinks = () => {
  const models = [
    { name: 'Gemini', files: ['gemini', 'gemini2', 'gemini3', 'gemini4', 'gemini5', 'gemini6', 'gemini7'] },
    { name: 'Kimi', files: ['kimi', 'kimi2'] },
    { name: 'DeepSeek', files: ['deepseek', 'deepseek2'] },
    { name: 'GLM', files: ['glm'] },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Infinitix Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <div key={model.name} className="space-y-2">
                <h3 className="font-semibold text-lg">{model.name}</h3>
                <div className="space-y-1">
                  {model.files.map((file) => (
                    <a
                      key={file}
                      href={`https://infinitix.auna.li/${file}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                    >
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelLinks;