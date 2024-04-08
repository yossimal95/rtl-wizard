import React, { useState, createContext, useContext, useEffect } from 'react';
import styles from './Wizard.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';

const WizardContext = createContext();

const Wizard = ({ steps, initStep }) => {

    const [currentStep, setCurrentStep] = useState(initStep ? initStep - 1 : 0);
    const [extraData, setExtraData] = useState({});

    const goNext = (e) => {
        if (!e?.cancelEvent) {
            setCurrentStep(currentStep + 1);
        }
    }

    const goPrev = (e) => {
        if (!e?.cancelEvent) {
            setCurrentStep(currentStep - 1);
        }
    }

    const finish = (e) => {
        if (!e?.cancelEvent) {

        }
    }

    const goToIndex = (stepId) => {
        if (stepId != null && stepId > -1 && stepId < steps.length) {
            setCurrentStep(stepId);
        }
    }

    const goToEnd = () => {
        setCurrentStep(steps.length - 1);
    }

    const goToStart = () => {
        setCurrentStep(0);
    }

    const getCurrentStepTitle = () => {
        if (steps.length != 0) {
            if (steps[currentStep]?.props?.title != null) {
                return steps[currentStep]?.props?.title;
            }
            return '';
        }
    }

    useEffect(() => {
        window.onbeforeunload = (e) => {
            return '';
        };
    }, []);

    const wizardContextValue = {
        currentStep,
        steps,
        extraData,
        setExtraData,
        getCurrentStepTitle,
        goNext,
        goPrev,
        finish,
        goToIndex,
        goToEnd,
        goToStart
    };

    return (
        <WizardContext.Provider value={wizardContextValue}>
            <div className={styles.container}>
                <ProgressBar />
                <div className={styles.body}>
                    {
                        steps.map((step, index) => {
                            return <div className={styles.step_container} style={{ display: (index == currentStep ? 'block' : 'none') }} key={index}>{step}</div>
                        })
                    }
                </div>
            </div>
        </WizardContext.Provider>
    );
};

const WizardUtil = () => useContext(WizardContext);

export { Wizard, WizardUtil };