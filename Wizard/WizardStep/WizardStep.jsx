import React, { useState } from "react";
import { WizardUtil } from "../Wizard/Wizard";
import styles from './WizardStep.module.css';

const WizardStep = ({ title, onNext, onPrev, onFinish, body, nextDisabled, prevDisabled, finishDisabled, buttonNextText,  buttonPrevText,  buttonFinishText }) => {

    const wizard = WizardUtil();

    const goNext = (e) => {
        if (onNext != null) {
            onNext(e);
        }
        if (!e?.cancelEvent) {
            wizard.goNext(e);
        }
    }

    const goPrev = (e) => {
        if (onPrev != null) {
            onPrev(e);
        }
        if (!e?.cancelEvent) {
            wizard.goPrev(e);
        }
    }

    const finish = (e) => {
        if (onFinish != null) {
            onFinish(e);
        }
        if (!e?.cancelEvent) {
            wizard.finish(e);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                {
                    body
                }
            </div>
            <div className={styles.buttons_container}>
                {
                    wizard?.currentStep == wizard?.steps?.length - 1 &&
                    <button className={[styles.finish_button, styles.button, (finishDisabled ? styles.button_disabled : '')].join(' ')} onClick={(e) => { finish(e); }} disabled={finishDisabled || false}>{buttonFinishText ?? 'סיום'}</button>
                }
                {
                    wizard.currentStep != wizard.steps.length - 1 &&
                    <button className={[styles.next_button, styles.button, (nextDisabled ? styles.button_disabled : '')].join(' ')} onClick={(e) => { goNext(e); }} disabled={nextDisabled || false}>{buttonNextText ?? 'הבא'}</button>
                }
                {
                    wizard.currentStep != 0 &&
                    <button className={[styles.prev_button, styles.button, (prevDisabled ? styles.button_disabled : '')].join(' ')} onClick={(e) => { goPrev(e); }} disabled={prevDisabled || false}>{buttonPrevText ?? 'הקודם'}</button>
                }
            </div>
        </div>
    );
}

export default WizardStep;