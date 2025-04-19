
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Quiz } from '@/data/mockData';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number, passed: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleOptionSelect = (optionIndex: number) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelections);
  };

  const handleNext = () => {
    if (selectedOptions[currentQuestion] === -1) {
      toast({
        variant: "destructive",
        title: "Please select an answer",
        description: "You need to select an option before proceeding."
      });
      return;
    }
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    
    quiz.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOption) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    setShowResults(true);
    onComplete(score, passed);
  };

  const renderQuestion = () => {
    const question = quiz.questions[currentQuestion];
    
    return (
      <>
        <CardHeader>
          <CardTitle className="text-lg">Question {currentQuestion + 1} of {quiz.questions.length}</CardTitle>
          <CardDescription>{question.text}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedOptions[currentQuestion].toString()}
            onValueChange={(value) => handleOptionSelect(parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </>
    );
  };

  const renderResults = () => {
    const correctAnswers = quiz.questions.filter(
      (question, index) => selectedOptions[index] === question.correctOption
    ).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    return (
      <>
        <CardHeader>
          <div className="flex justify-center mb-4">
            {passed ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <AlertCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-center text-lg">
            {passed ? "Congratulations!" : "Quiz Not Passed"}
          </CardTitle>
          <CardDescription className="text-center">
            {passed 
              ? `You passed the quiz with a score of ${score}%` 
              : `You scored ${score}%. Required score to pass: ${quiz.passingScore}%`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Questions:</span>
              <span>{quiz.questions.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Correct Answers:</span>
              <span>{correctAnswers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Score:</span>
              <span className="font-medium">{score}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Passing Score:</span>
              <span>{quiz.passingScore}%</span>
            </div>
            <div className="p-3 rounded-md bg-muted mt-4">
              <p className="text-sm text-center">
                {passed 
                  ? "You can now proceed to the next lesson." 
                  : "Review the material and try again."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      {!showResults ? renderQuestion() : renderResults()}
      
      <CardFooter className="border-t p-4">
        <div className="flex justify-between w-full">
          {!showResults ? (
            <>
              <Button 
                onClick={handlePrevious}
                variant="outline" 
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentQuestion === quiz.questions.length - 1 ? "Submit" : "Next"}
                {currentQuestion !== quiz.questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => window.history.back()}
              className="ml-auto"
            >
              Go Back
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizComponent;
