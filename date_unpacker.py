from datetime import datetime, timedelta

def generate_weekday_list(from_date: str, to_date: str) -> list[str]:
    start_date = datetime.fromisoformat(from_date)
    end_date = datetime.fromisoformat(to_date)
    date_list = []

    current_date = start_date
    while current_date <= end_date:
        if current_date.weekday() < 5:  # Monday is 0, Friday is 4
            date_list.append(current_date.date().isoformat())
        current_date += timedelta(days=1)

    return date_list

# Example usage
from_date = "2024-07-15"
to_date = "2024-08-26"

weekdays = generate_weekday_list(from_date, to_date)

print(f"Weekdays between {from_date} and {to_date}:")
for date in weekdays:
    print(date)