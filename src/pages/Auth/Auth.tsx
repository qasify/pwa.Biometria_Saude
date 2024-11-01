import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import Card, { CardBody } from '../../components/Card';

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const handleHaveAccount = () => {
    navigate('/login');
  };

  const handleNeedAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="w-full flex items-center justify-center p-2 self-center justify-self-center">
      <Card className="max-w-md w-full space-y-8">
        <CardBody>
          <img
            src="/assets/images/logo_angra.png"
            alt="Logo"
            className="mx-auto max-h-[130px]"
          />
          <h1 className="text-center text-2xl font-bold mt-4 mb-8">CADASTRO BIOMÉTRICO</h1>
          
          <div className="space-y-4">
            <Button onClick={handleHaveAccount} className="!w-full">
              Já tenho uma conta
            </Button>
            <Button  variant="bordered" onClick={handleNeedAccount} className="!w-full">
              Preciso criar uma conta
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Auth;