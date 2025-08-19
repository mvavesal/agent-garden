import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '@/app/(routes)/dashboard/agents/[sessionId]/page'
import moment from 'moment'

type props = {
    record: SessionDetail // A single consultation session record
}

/**
 * ViewReportDialog Component
 * 
 * Displays a full detailed medical report in a dialog when the user clicks "View Report".
 */
function ViewReportDialog({ record }: props) {
    const report: any = record?.report // Extract the report object from the session record
    const formatDate = moment(record?.createdOn).format("MMMM Do YYYY, h:mm a") // Format date nicely

    return (
        <Dialog>
            {/* 🧿 Button to trigger the dialog */}
            <DialogTrigger asChild>
                <Button variant={'link'} size={'sm'}>View Report</Button>
            </DialogTrigger>

            {/* 🗂️ Dialog content container */}
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white shadow-lg p-6 border border-gray-200 w-[90vw] max-w-[800px] sm:w-[700px]">
                <DialogHeader>
                    {/* 🩺 Report Title */}
                    <DialogTitle asChild>
                        <h2 className='text-center text-3xl font-bold text-blue-500 mb-6'>
                            AI Voice Agent Report
                        </h2>
                    </DialogTitle>

                    {/* 📄 Report Description Content */}
                    <DialogDescription asChild>
                        <div className="space-y-6">
                            {/* 📅 Session Information */}
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-semibold text-gray-700">Agent:</span>
                                        <p className="text-gray-600">{report?.agent || record?.selectedAgent?.specialist || 'AI Medical Assistant'}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Date:</span>
                                        <p className="text-gray-600">{formatDate}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">User:</span>
                                        <p className="text-gray-600">{report?.user || 'Anonymous'}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Session ID:</span>
                                        <p className="text-gray-600 font-mono text-xs">{record?.sessionId}</p>
                                    </div>
                                </div>
                            </div>


                            {/* 📋 Summary */}
                            {report?.summary && (
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Consultation Summary</h3>
                                    <p className="text-gray-700 leading-relaxed">{report.summary}</p>
                                </div>
                            )}

                            {/* 🩹 Symptoms */}
                            {report?.symptoms && report.symptoms.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Reported Symptoms</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {report.symptoms.map((symptom: string, index: number) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* ⏰ Duration & Severity */}
                            <div className="grid grid-cols-2 gap-4">
                                {report?.duration && (
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Duration</h4>
                                        <p className="text-gray-700 bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">{report.duration}</p>
                                    </div>
                                )}
                                {report?.severity && (
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Severity</h4>
                                        <p className={`p-2 rounded border-l-4 font-medium ${
                                            report.severity.toLowerCase() === 'mild' ? 'bg-green-50 border-green-400 text-green-800' :
                                            report.severity.toLowerCase() === 'moderate' ? 'bg-yellow-50 border-yellow-400 text-yellow-800' :
                                            'bg-red-50 border-red-400 text-red-800'
                                        }`}>
                                            {report.severity}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* 💊 Medications Mentioned */}
                            {report?.medicationsMentioned && report.medicationsMentioned.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Medications Mentioned</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1 bg-amber-50 p-3 rounded-lg">
                                        {report.medicationsMentioned.map((medication: string, index: number) => (
                                            <li key={index}>{medication}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 💡 Recommendations */}
                            {report?.recommendations && report.recommendations.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Recommendations</h3>
                                    <div className="space-y-2">
                                        {report.recommendations.map((recommendation: string, index: number) => (
                                            <div key={index} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                                                <p className="text-gray-700">{recommendation}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 📝 Notes */}
                            {record?.notes && (
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Additional Notes</h3>
                                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{record.notes}</p>
                                </div>
                            )}

                            {/* 📝 Disclaimer Footer */}
                            <div className='pt-6 border-t border-gray-300 text-center text-sm text-gray-500'>
                                This report was generated by an AI Assistant for informational purposes only.
                                Please consult with a qualified healthcare professional for proper medical advice.
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ViewReportDialog
