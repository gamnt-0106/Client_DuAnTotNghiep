import React, { useState } from 'react'

type QuizType2Props = {
    data: any,
    check: boolean,
    select: any,
    onHanldeSetSelect: (select: any, check: boolean) => void
}

const QuizType2 = ({ data, check, select, onHanldeSetSelect }: QuizType2Props) => {

    return (
        <div className={`border-2 list__question__item ${data._id == select?.id
            ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
            : "border-[#CCCCCC]"} 
                                                    ${check === true
                ? data._id == select?.id
                    ? select?.isCorrect === 1
                        ? "bg-[#D6EAF8] border-[#5DADE2] "
                        : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                    : ""
                : ""} shadow-lg  mx-auto py-[20px] cursor-pointer rounded-xl w-full flex flex-col `
        }
            onClick={() => {
                if (check !== true) {
                    console.log("quiz 2")
                    onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect }, check)
                }
            }}
        >
            <div className="img__result__question__item self-center">
                <img src={`../../../../assets/image/water.png`} />
            </div>
            <div className="title__result__question__item text-center w-full block self-center">
                <span className="text-base font-bold block">{data.answer}</span>
            </div>
        </div>

    )
}

export default QuizType2