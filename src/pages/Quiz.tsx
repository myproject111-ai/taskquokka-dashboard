
import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Brain } from 'lucide-react';

const Quiz = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [quiz, setQuiz] = useState<{ question: string; options: string[]; answer: number }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast({
        title: "File Uploaded",
        description: "Your document has been uploaded successfully",
      });
    }
  };

  const generateSummary = () => {
    // TODO: Implement with backend
    setSummary("This is a placeholder summary. The actual summary generation will be implemented with the backend integration.");
    setShowSummary(true);
    toast({
      title: "Summary Generated",
      description: "Your document summary has been generated",
    });
  };

  const generateQuiz = () => {
    // TODO: Implement with backend
    setQuiz([
      {
        question: "This is a sample question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: 0
      },
      {
        question: "Another sample question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: 1
      }
    ]);
    setShowQuiz(true);
    toast({
      title: "Quiz Generated",
      description: "Your quiz has been generated based on the document",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quiz Generator</h1>
          <p className="text-gray-600 mt-2">Upload a document to generate summaries and quizzes</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {file ? (
                <div className="flex items-center justify-center gap-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <Label htmlFor="document-upload" className="block mt-4">
                    <span className="text-primary hover:text-primary-hover cursor-pointer">
                      Upload PDF or Word document
                    </span>
                    <Input
                      id="document-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </Label>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={generateSummary}
                disabled={!file}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Generate Summary
              </Button>
              <Button
                onClick={generateQuiz}
                disabled={!file}
                className="gap-2"
              >
                <Brain className="h-4 w-4" />
                Generate Quiz
              </Button>
            </div>
          </div>
        </Card>

        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
              <p className="text-gray-700 whitespace-pre-line">{summary}</p>
            </Card>
          </motion.div>
        )}

        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Generated Quiz</h2>
            {quiz.map((question, qIndex) => (
              <Card key={qIndex} className="p-6">
                <p className="font-medium mb-4">
                  {qIndex + 1}. {question.question}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        id={`question-${qIndex}-option-${oIndex}`}
                        className="w-4 h-4 text-primary"
                      />
                      <Label
                        htmlFor={`question-${qIndex}-option-${oIndex}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            <Button className="w-full">Submit Quiz</Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
