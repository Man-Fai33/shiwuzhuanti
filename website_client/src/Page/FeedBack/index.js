import { Paper } from '@material-ui/core'
import { Box } from '@mui/system'
import React from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
export default function FeedBack() {
    return (
        <Box mt={2} mb={2}>
            <Paper elevation={24}>

                <Box pl={8} pr={8} pt={4} pb={4}>
                    <Box mt={2} mb={2}>
                        若您針對本網站有下列問題或任何想法，歡迎與我們分享您的意見 :<br />
                        網頁整體建議或期望改善的功能<br />
                        網頁錯誤資訊修正<br />
                        網頁操作問題<br />
                    </Box>
                    <Box mt={1} mb={1}>
                        聯繫人：羅雅君<br />
                        熱線電話： A11008001<br />
                        24小時可以撥打此電話<br />
                
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">使用者名稱</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                            // value={values.amount}
                            // onChange={handleChange('amount')}
                            // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">聯絡電話</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                            // value={values.amount}
                            // onChange={handleChange('amount')}
                            // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">E-mail</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                            // value={values.amount}
                            // onChange={handleChange('amount')}
                            // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">意見</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                multiline
                                rows={5}
                            // value={values.amount}
                            // onChange={handleChange('amount')}
                            // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button variant='contained'>送出</Button>
                    </Box>
                </Box>

            </Paper>
        </Box>
    )
}