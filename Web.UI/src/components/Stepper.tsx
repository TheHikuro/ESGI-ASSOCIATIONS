import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CodeInputs, SoloInput } from './Input';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmail, confirmTokenSentByEmail } from '../api/login.axios.api';
import { getAllAssosActions } from '../utils/context/actions/assos';
import { useStoreContext } from '../utils/context/StoreContext';
import { joinAssosAction } from '../utils/context/actions/members';

export default function VerticalLinearStepper(user_values: { e_mail: string, userId: number }) {

    const [activeStep, setActiveStep] = React.useState(0);
    const [error, setError] = React.useState('');
    const [values, setValues]: any = React.useState({ email: user_values.e_mail, confirmToken: '' })
    const [disabled, setDisabled] = React.useState(true);
    const { dispatch, state: { assos: { assosList, needRefreshAssos }, user: { id } } } = useStoreContext()

    React.useEffect(() => {
        const fields: string[] = Object.keys(values);
        for (let i: number = 0; i <= activeStep; i++) {
            if (values[fields[i]] === '') {
                setDisabled(true);
                return;
            }
        }
        setDisabled(false);
    }, [values, activeStep])

    React.useEffect(() => {
        if (needRefreshAssos) getAllAssosActions(dispatch);
    }, [needRefreshAssos])

    const handleNext = () => { setActiveStep(prevActiveStep => prevActiveStep + 1) }
    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
    const handleClear = (name: string) => { setValues({ ...values, [name]: '' }) }

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValues({ ...values, [name]: event.target.value });
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    }

    const sendEmail = async () => {
        try {
            await checkEmail(user_values.userId)
            handleNext();
        }
        catch (error: any) {
            setError(error.response.data["hydra:description"]);
        }
    }

    const checkIfVericationCodeIsCorrect = async (token: string) => {
        const jsonToken = JSON.stringify({ confirmationCode: token });
        const response = await confirmTokenSentByEmail(user_values.userId, jsonToken);

        if (response.status === 204) {
            handleNext();
        }
        else {
            setError('Verification code is incorrect')
            setTimeout(() => {
                setError('')
            }, 5000)
        }

    }

    const handleJoinAssos = async (idAssos: number, idMember: number) => {
        joinAssosAction(dispatch, idAssos, idMember);
        //window.location.reload();
    }

    const steps = [
        {
            label: "Verification d'email",
            description: <>
                <div className='flex items-center'>
                    <SoloInput name='Email' type='email' onChange={handleChange('email')} value={values.email} handlePressEnter={handlePressEnter} disabled />
                </div>
                {error && <Typography variant='caption' color='error'>{error}</Typography>}
            </>,
        },
        {
            label: 'Code de confirmation de votre email',
            description: <>
                <div className='flex items-center'>
                    <CodeInputs length={6} loading={false} onComplete={(code: string) => checkIfVericationCodeIsCorrect(code)} />
                </div>
                {error && <Typography variant='caption' color='error'>{error}</Typography>}
            </>
        },
        {
            label: 'Rejoindre une association',
            description: <>
                <div className='flex h-80 relative bg-slate-400 rounded-md overflow-scroll flex-col p-5'>
                    {assosList.map((assos: any) => {
                        return (
                            <div key={assos.id} className='flex items-center justify-between p-2 w-full'>
                                <Typography variant='h6'>{assos.name}</Typography>
                                <Button className='h-12' variant='contained' color='primary' onClick={() => handleJoinAssos(assos.id, id)}> Rejoindre </Button>
                            </div>
                        )
                    })}
                </div>
            </>,
        },
    ];

    return (
        <Box className='h-full w-full'>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                {activeStep === 1 ? (
                                    <>
                                        <div className='flex flex-col mt-3'>
                                            <Link to={'/'} target='_blank'>Vous n'avez pas reçu le code ?</Link>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                                className='w-20'
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </>

                                ) : ''}
                                {activeStep === 0 ? (
                                    (
                                        <>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={index === 0 ? sendEmail : handleNext} // remettre send mail
                                                    sx={{ mt: 1, mr: 1 }}
                                                    disabled={disabled}
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        </>
                                    )) : ''
                                }
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {
                activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>Vous allez être rediriger vers votre profil...</Typography>
                    </Paper>
                )
            }
        </Box >
    );
}
