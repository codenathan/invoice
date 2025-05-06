import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, BusinessSetting } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Business Setting Update',
        href: '/business-setting',
    },
];

interface Flash {
    success?: string;
    danger?: string;
}


export default function ClientEdit({businessSetting} : {businessSetting: BusinessSetting}) {

    const { flash } = usePage<{flash : Flash}>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
    })


    const { data, setData, post, processing, errors } = useForm({
        name: businessSetting.name,
        address_line_1 : businessSetting.address_line_1,
        address_line_2 : businessSetting.address_line_2,
        city : businessSetting.city,
        state : businessSetting.state,
        postal_code : businessSetting.postal_code,
        invoice_footer : businessSetting.invoice_footer,
        logo: null as File | null,
        _method: 'patch',
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('business-setting.update', businessSetting.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Create" />
            <section className="rounded-lg p-4">
                <form className="flex flex-col gap-6"  onSubmit={submit} encType="multipart/form-data">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Name"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address_line_1">Address Line 1</Label>
                            <Input
                                id="address_line_1"
                                type="text"
                                tabIndex={3}
                                value={data.address_line_1 ?? ''}
                                onChange={(e) => setData('address_line_1', e.target.value)}
                                placeholder="Address Line 1"
                            />
                            <InputError message={errors.address_line_1} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address_line_2">Address Line 2</Label>
                            <Input
                                id="address_line_2"
                                type="text"
                                tabIndex={3}
                                value={data.address_line_2 ?? ''}
                                onChange={(e) => setData('address_line_2', e.target.value)}
                                placeholder="Address Line 2"
                            />
                            <InputError message={errors.address_line_2} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                type="text"
                                tabIndex={4}
                                value={data.city ?? ''}
                                onChange={(e) => setData('city', e.target.value)}
                                placeholder="City"
                            />
                            <InputError message={errors.city} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                type="text"
                                tabIndex={5}
                                value={data.state ?? ''}
                                onChange={(e) => setData('state', e.target.value)}
                                placeholder="State"
                            />
                            <InputError message={errors.state} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="postal_code">Postal Code</Label>
                            <Input
                                id="postal_code"
                                type="text"
                                tabIndex={6}
                                value={data.postal_code ?? ''}
                                onChange={(e) => setData('postal_code', e.target.value)}
                                placeholder="Postal Code"
                            />
                            <InputError message={errors.postal_code} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="invoice_footer">Notes</Label>
                            <Textarea
                                id="invoice_footer"
                                tabIndex={7}
                                value={data.invoice_footer ?? ''}
                                onChange={(e) => setData('invoice_footer', e.target.value)}
                                placeholder="Invoice Footer"
                            />
                            <InputError message={errors.invoice_footer} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="logo">Upload Logo</Label>
                            <Input
                                id="logo"
                                type="file"
                                tabIndex={8}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setData('logo', file);
                                }}
                            />
                            <InputError message={errors.logo} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Update
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    );
}
