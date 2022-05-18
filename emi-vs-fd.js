const principal=400000
const yearly_interest_rate=8/100
const fd_rate=5.25/100
const num_years=5
const num_months=num_years*12
const monthly_interest_rate=yearly_interest_rate/12
const monthly_fd_rate=fd_rate/12


const r1=Math.pow(1+monthly_interest_rate,num_months)
const payable_amount_per_month=principal*monthly_interest_rate*r1/(r1-1)
console.log("Monthly EMI for a loan of", principal,"is", Math.round(payable_amount_per_month))

const fd_amounts_required = []
for(let i=1;i<=num_months;i++){
	const x = Math.pow(1+monthly_fd_rate,-1*i)
	fd_amounts_required.push(payable_amount_per_month*x)
}

const totalAmountForFD=fd_amounts_required.reduce((p,c)=>p+c,0)
console.log("FD amount required at T0",Math.round(totalAmountForFD))
console.log("Total amount loss in case of FD at T0", Math.round(totalAmountForFD-principal))
