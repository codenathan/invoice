import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Client Create',
        href: '/client',
    },
];

type ClientForm = {
    name: string;
    address_line_1 : string ;
    address_line_2 : string;
    city : string;
    state : string;
    postal_code : string;
    notes : string;
};

export default function ClientCreate() {

    const { data, setData, post, processing, errors } = useForm<ClientForm>({
        name: '',
        address_line_1 : '',
        address_line_2 : '',
        city : '',
        state : '',
        postal_code : '',
        notes : ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('client.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Create" />
            <section className="rounded-lg p-4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
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
                                tabIndex={2}
                                value={data.address_line_1}
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
                                value={data.address_line_2}
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
                                value={data.city}
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
                                value={data.state}
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
                                value={data.postal_code}
                                onChange={(e) => setData('postal_code', e.target.value)}
                                placeholder="Postal Code"
                            />
                            <InputError message={errors.postal_code} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                tabIndex={3}
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Notes"
                            />
                            <InputError message={errors.notes} />
                        </div>


                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create
                        </Button>
                    </div>

                </form>
            </section>
        </AppLayout>
    );
}
