import axios from "axios"

export const getFilteredResponses = async (req, res) => {
    const { formId } = req.params
    const { limit, offset } = req.query
    const filter = JSON.parse(req.query.filter)
    try {
        const response = await axios.get(
            `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
            {
                params: {
                    limit: limit ?? 150,
                    offset: offset ?? 0
                },
                headers: {
                    Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`
                }
            }
        )
        const submissions = response.data.responses
        const filteredSubmissions = submissions.filter((submission) => {
            for (const question of submission.questions) {
                if (question.id === filter.id) {
                    let questionValue
                    let filterValue
                    if (question.type === "DatePicker") {
                        questionValue = new Date(question.value).getTime()
                        filterValue = new Date(filter.value).getTime()
                    } else {
                        questionValue = question.value
                        filterValue = filter.value
                    }
                    if (filter.condition === "equals") {
                        if (questionValue === filterValue) {
                            return true
                        }
                    } else if (filter.condition === "does_not_equal") {
                        if (questionValue !== filterValue) {
                            return true
                        }
                    } else if (filter.condition === "greater_than") {
                        if (questionValue > filterValue) {
                            return true
                        }
                    } else if (filter.condition === "less_than") {
                        if (questionValue < filterValue) {
                            return true
                        }
                    }
                }
            }
            return false
        })
        res.status(200).send({
            ...response.data,
            responses: [...filteredSubmissions]
        })
    } catch (error) {
        console.error(error)
    }
}
