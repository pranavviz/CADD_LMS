
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface CertificateProps {
  studentName: string;
  courseName: string;
  issueDate: string;
  instructorName?: string;
}

const Certificate: React.FC<CertificateProps> = ({
  studentName,
  courseName,
  issueDate,
  instructorName
}) => {
  const downloadCertificate = () => {
    // In a real app, this would generate and download a PDF
    alert('Certificate download functionality would be implemented here.');
  };

  const shareCertificate = () => {
    // In a real app, this would open a sharing dialog
    alert('Certificate sharing functionality would be implemented here.');
  };
  
  // Format the date
  const formattedDate = new Date(issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <Card className="w-full p-8 mb-4 shadow-lg certificate">
        <div className="border-8 border-double border-primary/20 p-6 text-center">
          <div className="mb-6">
            <h2 className="uppercase text-sm tracking-widest text-gray-500">CADD Center</h2>
            <div className="font-serif text-4xl font-bold mt-2 text-primary">Certificate of Completion</div>
          </div>
          
          <div className="my-8">
            <p className="text-gray-600 mb-2">This is to certify that</p>
            <p className="text-2xl font-serif font-bold my-3">{studentName}</p>
            <p className="text-gray-600 mb-2">has successfully completed the course</p>
            <p className="text-xl font-medium my-3">{courseName}</p>
            <p className="text-gray-600 mt-4">Issued on {formattedDate}</p>
            {instructorName && (
              <p className="text-gray-600 mt-1">Instructor: {instructorName}</p>
            )}
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex justify-center">
              <div className="text-center">
                <div className="h-px w-40 bg-black mb-2 mx-auto"></div>
                <p className="font-serif">CADD Center Director</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex gap-4">
        <Button onClick={downloadCertificate} className="gap-2">
          <Download size={16} />
          Download
        </Button>
        <Button variant="outline" onClick={shareCertificate} className="gap-2">
          <Share2 size={16} />
          Share
        </Button>
      </div>
    </div>
  );
};

export default Certificate;
