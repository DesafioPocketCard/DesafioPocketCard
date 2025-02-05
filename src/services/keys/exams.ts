
const examsKeys = {
    'find-all-exams-confirmed': 'find-all-exams-confirmed',
    'find-all-exams-scheduled': 'find-all-exams-scheduled'
}

const examsKeysFilters = {
    findAllExamsConfirmed: (extraQueries: any[] = []) => [examsKeys["find-all-exams-confirmed"], ...extraQueries],
    findAllExamsScheduled: (extraQueries: any[] = []) => [examsKeys['find-all-exams-scheduled'], ...extraQueries],
}

export { examsKeysFilters, examsKeys }