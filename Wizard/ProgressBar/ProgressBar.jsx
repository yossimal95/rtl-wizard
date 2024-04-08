import React from 'react';
import { WizardUtil } from '../Wizard/Wizard';
import styles from './ProgressBar.module.css';
import WizardMainStyle from '../WizardMainStyle/WizardMainStyle.module.css';

const ProgressBar = ({ }) => {

    const wizard = WizardUtil();

    const getStepCssClass = (index) => {        
        switch (true) {            
            case wizard.currentStep == index:
                return WizardMainStyle.is_active;
            case wizard.currentStep > index:
                return WizardMainStyle.is_complete;
            default:
                return '';
        }
    }

    return (
        <div className={styles.container}>
            <ol className={WizardMainStyle.progress_bar}>
                {
                    wizard.steps?.map((step, index) => {
                        return <li key={index} className={getStepCssClass(index)}>
                            <span>
                                {step?.props?.title ?? ''}
                            </span>
                        </li>
                    }).reverse()
                }
            </ol>
        </div>
    );
}

export default ProgressBar;