import asyncio
import aiohttp
from datetime import datetime
import json

api_key = "d91dbc4e-2e19-4bbe-a867-d48ef1ad1bc9"
energy_id = "LUXE-OL-KO-F1QNY"

headers = {"X-API-KEY": api_key, "X-ENERGY-ID": energy_id}

meters = [
    {"id": "LU0000010983800000000000070056600", "types": ["consumption"]},
    {"id": "LU0000010983800000000000070590176", "types": ["consumption"]},
    {"id": "LU0000010983800000000000770590176", "types": ["production"]},
    {"id": "LU0000010983800000000000070578580", "types": ["consumption"]},
    {"id": "LU0000010983800000000000770578580", "types": ["production"]}
]

start_date = datetime(2026, 1, 1)
end_date = datetime(2026, 6, 23)

async def fetch_aggregated(session, meter_id, obis_code):
    url = f"https://api.leneda.eu/api/metering-points/{meter_id}/time-series/aggregated"
    params = {
        "startDate": start_date.strftime("%Y-%m-%d"),
        "endDate": end_date.strftime("%Y-%m-%d"),
        "obisCode": obis_code,
        "aggregationLevel": "Infinite",
        "transformationMode": "Accumulation"
    }
    async with session.get(url, headers=headers, params=params) as response:
        if response.status != 200:
            print(f"Error {response.status} for {meter_id} / {obis_code}")
            return 0.0
        res = await response.json()
        series = res.get("aggregatedTimeSeries", [])
        return sum(item.get("value", 0) or 0 for item in series)

async def main():
    async with aiohttp.ClientSession() as session:
        print("Fetching aggregated data for 1. Jan. - 23. Juni 2026:")
        for meter in meters:
            m_id = meter["id"]
            m_types = meter["types"]
            print(f"\nMeter {m_id} ({', '.join(m_types)}):")
            
            # Active Consumption (1-1:1.29.0)
            c_val = await fetch_aggregated(session, m_id, "1-1:1.29.0")
            print(f"  1-1:1.29.0 (Active Consumption): {c_val:.3f} kWh")
            
            # Active Production (1-1:2.29.0)
            p_val = await fetch_aggregated(session, m_id, "1-1:2.29.0")
            print(f"  1-1:2.29.0 (Active Production): {p_val:.3f} kWh")
            
            # Remaining Consumption (1-65:1.29.9)
            c_rem = await fetch_aggregated(session, m_id, "1-65:1.29.9")
            print(f"  1-65:1.29.9 (Remaining Consumption): {c_rem:.3f} kWh")
            
            # Remaining Production (1-65:2.29.9)
            p_rem = await fetch_aggregated(session, m_id, "1-65:2.29.9")
            print(f"  1-65:2.29.9 (Remaining Production): {p_rem:.3f} kWh")

if __name__ == "__main__":
    asyncio.run(main())
